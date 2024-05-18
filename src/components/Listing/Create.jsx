import { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PictureInput, Form } from '@/components/Form'
import { Container, Row, Col } from 'react-bootstrap';
import NewListingForm from '@/components/Listing/NewListing'
import { supabase } from "@/config/SupabaseClient"
import resizeImg from '@/lib/resizeImg'
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import useAuthentication from "@/contexts/authentication/useAuthentication";


export const CreateListing = () => {
  const { user } = useAuthentication();
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState()
  const router = useRouter();

  const cancel = () => {
    setListing(null);
  }

  const pictureToListing = async (data) => {
    setIsLoading(true);

    const resizedImg = await resizeImg(data.pictureFile, 800, 800)
    const hdFile = await resizeImg(data.pictureFile, 2000, 2000, 'file')

    const response = await fetch('/api/listings/generate', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ picture: resizedImg }),
    });
    const resp = await response.json();
    const uuid = uuidv4();
    const filePath = `${user?.id}/${uuid}.${hdFile.name.split('.')[1]}`;

    await supabase.storage
      .from('offers')
      .upload(filePath, hdFile, {
      cacheControl: '3600',
      });

    const generatedlisting = { ...resp, tags: resp.tags.join(', '), picture: `https://nchfhnhquozlugyqknuf.supabase.co/storage/v1/object/public/offers/${filePath}` };
    setListing(generatedlisting);
    setIsLoading(false);
  }

  const saveListing = async ({ title, description, picture, price, tags }) => {
    const listing = {
      title,
      description,
      images: [picture],
      proposition_terms: {
        don: price === 0,
        pret: false,
        vente: price !== 0,
        service: false,
        location: false,
      },
      tags: tags.split(',').map(tag => tag.trim()),
      price: price,
    }
    try {
      await fetch('/api/listings/save-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      setSaveStatus('success');

      setTimeout(() => {
        router.push('/listings');
      }, 3 * 1000);

    } catch (error) {

      setSaveStatus('error');
      alert('FAIL');

    }

  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col>

          <div className={cn(!!listing ? 'd-none' : 'd-block', 'position-relative')}>
            <Form onSubmit={pictureToListing}>
              <PictureInput
                name="picture"
                label="Choose or Take a Picture"
              />
            </Form>
            {isLoading &&
              <div className="full-width-height bg-light text-center d-flex align-items-center justify-content-center">
                <FaWandMagicSparkles size="2em" className="px-2" />
                L'assistant owo est au travail et rédige votre annonce!
              </div>
            }
            <Link href="/messages/offer">
              Je ne veux pas commencer par une photo
            </Link>
          </div>
          {
            !!listing &&
            <NewListingForm
              listing={listing}
              cancel={cancel}
              saveListing={saveListing}
            />
          }

          {saveStatus === 'success' && (
            <div className="alert alert-success" role="alert">
              Votre annonce a été sauvegardé! Vous allez être redirigé vers le <Link href='/listings'>marché</Link>.
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="alert alert-error" role="alert">
              Une erreur c'est produite. Vous pouvez essayer a nouveau.
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

