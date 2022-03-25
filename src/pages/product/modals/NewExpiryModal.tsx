import CustomInput from "@kiwi/ui/inputs"
import React from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { ButtonReset } from "@kiwi/ui/buttons/IconButton"
import { formatISO, startOfToday } from "date-fns"
import { gql, useMutation } from "@apollo/client"
import { useParams } from "react-router-dom"

interface CreateExpiryVars {
  expiry: {
    date: Date
    upc: string
  }
}

const CreateExpiry = gql`
    mutation CreateExpiry($expiry: ExpiryInput!) {
        expiry {
            create(expiry: $expiry) {
                date
                id
            }
        }
    }
`

function NewExpiryModal({ close }: { close: () => void }) {
  const { upc } = useParams()
  const { register, handleSubmit } = useForm()
  const [ createExpiry ] = useMutation<any, CreateExpiryVars>(CreateExpiry)

  const onSubmitHandler = async (formData: any) => {
    createExpiry({
      refetchQueries: [
        "QueryProductExpired",
        "QueryProductExpiring"
      ],
      variables: {
        expiry: {
          upc: upc!,
          date: formData.date
        },
      }
    })
      .then(() => close())
  }

  return (
    <Wrapper>
      <h3>New Expiry Date</h3>
      <form id="newExpiryForm" onSubmit={handleSubmit(onSubmitHandler)}>
        <CustomInput label="Expiry Date"
                     type="date"
                     defaultValue={formatISO(startOfToday(), { representation: "date" })}
                     autoComplete="false"
                     {...register("date", {
                       required: true
                     })}/>
      </form>
      <SubmitButton as="input" form="newExpiryForm" type="submit" value="Create Expiry"/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SubmitButton = styled(ButtonReset)`
  background: #31F58D;
  border-radius: 1rem;
  color: black;
  font-weight: 500;
  margin-top: 2rem;
  padding: 1rem 2rem;
`

export default NewExpiryModal
