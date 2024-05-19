import { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Button, buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Container, Row, Col } from 'react-bootstrap';
import NewListingForm from '@/components/Listing/NewListingForm'
import { supabase } from "@/config/SupabaseClient"
import resizeImg from '@/lib/resizeImg'
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import useAuthentication from "@/contexts/authentication/useAuthentication";
import { PlusIcon } from "@/components/ui/icons"
import usePicturePreview from '@/contexts/usePicturePreview';


export const CreateListing = () => {
  const { user } = useAuthentication();
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState()
  const router = useRouter();
  const { resetImage, pictureFile, changePictureFile, stringPicture, haveFile } = usePicturePreview();


  const cancel = () => {
    setListing(null);
  }

  const pictureToListing = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!haveFile) return;

    setIsLoading(true);

    const resizedImg = await resizeImg(pictureFile, 800, 800)
    const hdFile = await resizeImg(pictureFile, 2000, 2000, 'file')

    const response = await fetch('/api/listings/generate', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ picture: resizedImg }),
    });
    const resp = await response.json();
    console.log(resp)
    const uuid = uuidv4();
    const filePath = `${user?.id}/${uuid}.${hdFile.name.split('.')[1]}`;

    await supabase.storage
      .from('offers')
      .upload(filePath, hdFile, {
      cacheControl: '3600',
      });

    const generatedlisting = { ...resp, price: 0, tags: resp.tags.join(', '), picture: `https://nchfhnhquozlugyqknuf.supabase.co/storage/v1/object/public/offers/${filePath}` };
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
    <>
      {!listing &&
        <div>
            <div
              className="fixed h-[calc(100dvh-100px)] bottom-0 inset-0 flex items-center justify-center bg-cover bg-center"
              controlname="picuture"
              style={{
                backgroundImage: `url('${stringPicture || '/placeholder.svg'}')`,
                top: 'auto'
              }}
            >

              <div className={cn(
                "absolute inset-0 backdrop-blur-sm dark:bg-gray-800/50",
                !haveFile ? 'bg-gray-900/50' : 'bg-white/30'
              )} />

              <label
                disabled={isLoading}
                htmlFor="picuture"
                className={cn(
                  "group z-10 flex h-full w-full flex-col items-center justify-center cursor-pointer transition-colors",
                  !haveFile && "hover:bg-gray-900/70 dark:hover:bg-gray-800/70")}
              >

                {!haveFile && <>
                  <PlusIcon className="text-white group-hover:scale-110 transition-transform h-24 w-24" />
                  <span className="mt-4 text-2xl font-medium text-white text-center">
                    Choisir ou <br />prendre une photo
                  </span>
                </>}


              {/* error && (
                <Form.Text className="text-destructive text-md">
                  {error.message}
                </Form.Text>
              )*/}

              {haveFile && !isLoading &&
                <div className="flex flex-col space-y-2 gap-6">
                  <Button variant="secondary" onClick={pictureToListing} className="w-full" size="xl">🤖 Générer une annonce avec cette photo 🤖</Button>
                  <Button variant="outline" onClick={resetImage} className="w-full">Annuler</Button>
                </div>
              }


              {haveFile && isLoading &&
                <div className="full-width-height bg-light text-center d-flex align-items-center justify-content-center">
                  <FaWandMagicSparkles size="2em" className="px-2" />
                  L'assistant owo est au travail et rédige votre annonce! // TODO: animate the background to pulse on loading
                </div>
              }

              {!haveFile &&
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "mt-4"
                  )}
                  href="/messages/offer" onClick={e => e.stopPropagation()}
                >
                  Je ne veux pas commencer par une photo
                </Link>
              }


              <input
                id="picuture"
                type="file"
                className="sr-only"
                onChange={(e) => changePictureFile(e.target.files[0])}
                accept="image/*"
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
      }
      {!!listing &&
        <NewListingForm
          initialValues={listing}
          cancel={cancel}
          onSubmit={saveListing}
        />
      }
      {saveStatus === 'success' && (
        <Alert variant="success" className="mx-auto sm:w-[450px] w-full mt-4">
          <FaWandMagicSparkles className="h-4 w-4" />
          <AlertTitle>Merci!</AlertTitle>
          <AlertDescription>
          Votre annonce a été sauvegardé! Vous allez être redirigé vers le <Link href='/listings'>marché</Link>.
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert variant="destructive" className="mx-auto sm:w-[450px] w-full mt-4">
          <FaWandMagicSparkles className="h-4 w-4" />
          <AlertTitle>Dommage...</AlertTitle>
          <AlertDescription>
            Une erreur c'est produite. Vous pouvez essayer a nouveau. Si cette erreur persiste, n'hésiuze pas à nous contacter!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

