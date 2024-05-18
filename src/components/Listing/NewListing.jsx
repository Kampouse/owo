import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Button } from "@/components/ui/button"
import { Form, Input, Textarea, ListingPriceInput } from '@/components/Form'


const NewListing = ({ cancel, saveListing, listing }) => {
  const [isLoading, setIsLoading] = useState(false)

  const onSave = async (values) => {
    setIsLoading(true)
    await saveListing(values)
    setIsLoading(false)
  }

  return (
      <Form onSubmit={onSave} defaultValues={listing}>

        <Input
          name="title"
          label="Titre"
          rules={{
            required: "Entrez un titre",
          }}
        />
        <Textarea
          name="description"
          label="Description"
          rules={{
            required: "Entrez une description",
          }}
        />
        <Textarea
          name="imageDescription"
          label="Descirption de l'image (générée)"
          rules={{
            required: "Descirption de l'image",
          }}
        />
        <Input
          name="tags"
          label="Tags"
          rules={{
            required: "Entrez des tags",
          }}
        />

        <ListingPriceInput
          name="price"
          label="Prix"
          rules={{
            required: "Entrez un prix",
          }}
        />

        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Button variant="link" className="px-0" onClick={cancel}>X Cancel</Button>
          </Nav.Item>
          <Nav.Item className="ml-auto">
            <Button variant="success" type="submit" disabled={isLoading}>Publier</Button>
          </Nav.Item>
        </Nav>
      </Form>
  );
}

export default NewListing;
