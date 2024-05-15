import React from 'react';
import { Button } from "@/components/ui/button"
import { ButtonGroup } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const AiFeedback = ({}) => {

  return (
    <ButtonGroup className="mb-2 text-muted ">
      <Button variant="outline">
        <FaThumbsDown className="text-muted" />
      </Button>
      <Button variant="outline"><FaThumbsUp className="text-muted"  /></Button>
    </ButtonGroup>
  )
}


export default AiFeedback;
