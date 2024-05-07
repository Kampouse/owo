import { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PictureInput, Form, Input, Textarea } from '@/components/Form'
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { PrivateLayout } from "@/components/Layouts"
import NewListing from '@/components/Listing/NewListing'
import { supabase } from "@/config/SupabaseClient"
import resizeImg from '@/utils/resizeImg'
import { useRouter } from 'next/router';


const CreateListing = () => {
  const { token } = 'TOKEN' // TODO: make it work ; useAuthentication();
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

    fetch('/api/listings/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ picture: resizedImg }),
    })
      .then(response => response.json())
      .then(resp => {
        const generatedlisting = { ...resp, tags: resp.tags.join(', '), picture: data.picture }
        setListing(generatedlisting);
        setIsLoading(false);
    })
  }

  const saveListing = ({ title, description, picture, price, tags }) => {
    const listing = {
      title,
      description,
      images: [picture],
      proposition_terms: {
        don: price === 0 ,
        pret: false,
        vente: price !== 0,
        service: false,
        location: false,
      },
      tags: tags.split(',').map(tag => tag.trim()),
      price: price,
    }
    console.log('saving listing', listing);

    supabase.functions.invoke('save-offer', { body: listing })
    .then((response) => {
      console.log(response.data);
      setSaveStatus('success');
      debugger
      setTimeout(() => {
        console.log('lisrintgs')
        router.push('/listings')
      }, 3*1000);
    })
    .catch((error) => {
      console.error(error);
      setSaveStatus('error');
      alert('FAIL');
    })

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
                <FaWandMagicSparkles size="2em" className="px-2"/>
                L'assistant owo est au travail et rédige votre annonce!
              </div>
            }
            <Link href="/messages/offer">
              Je ne veux pas commencer par une photo
            </Link>
          </div>
          {
            !!listing &&
            <NewListing
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

CreateListing.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default CreateListing
