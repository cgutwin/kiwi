import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import CustomInput from "@kiwi/ui/inputs"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { ButtonReset } from "@kiwi/ui/buttons/IconButton"
import { useMutation } from "@apollo/client"
import mutationCreateProduct from "@kiwi/graphql/mutations/createProduct"
import { PageWrapper } from "@kiwi/styles/layout"
import VerticalTitleHeader from "../../../components/VerticalTitleHeader"

function CreateProduct() {
  const { upc } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm()
  const { isDirty } = formState
  const [ createProduct ] = useMutation(mutationCreateProduct)

  const handleBackClick = () => {
    if (isDirty) {
      if (window.confirm("You have made changes to the product. Do you want to go back and lose your changes?")) {
        navigate(-1)
      }
    } else {
      navigate(-1)
    }
  }

  const submitHandler = (data: any) => {
    if (isDirty) {
      createProduct({
        variables: {
          data
        }
      })
        .then(({ data }) => {
          data && navigate(`/product/${upc}`)
        })
    } else if (window.confirm("No changes have been made, go back?")) {
      navigate(-1)
    }
  }

  return (
    <PageWrapper>
      <VerticalTitleHeader title="Create Product"
                           subtitle={upc}
                           backAction={handleBackClick}
                           overflowAction={() => null}/>
      <main style={{
        margin: "1rem"
      }}>
        <form onSubmit={handleSubmit(submitHandler)} id="editProductForm">
          <CustomInput label="Product Name" type="text" autoComplete="false"
                       {...register("name", {
                         required: true
                       })}/>
          <CustomInput label="Price"
                       type="number"
                       inputMode="decimal"
                       autoComplete="false"
                       step="0.01"
                       {...register("price", {
                         required: true,
                         valueAsNumber: true
                       })}/>
          <CustomInput label="Product UPC" type="text" defaultValue={upc} {...register("upc", {
            required: true
          })}/>
        </form>
      </main>
      <FixedSubmit>
        <SubmitButton as="input" type="submit" value="Create Product" form="editProductForm"/>
      </FixedSubmit>
    </PageWrapper>
  )
}

const SubmitButton = styled(ButtonReset)`
  background: #31F58D;
  border-radius: 1rem;
  color: black;
  font-weight: 600;
  padding: 1rem;
  width: 100%;
`

const FixedSubmit = styled.section`
  background: ${({ theme }) => theme.colours.background.hex};
  border-top: 1px solid ${({ theme }) => theme.colours.text.fade};
  margin-top: 1rem;
  position: sticky;
  bottom: 0;
  width: 100%;
  // Three rem bottom padding for iOS nav.
  padding: 1rem 1rem 3rem;
`

export default CreateProduct
