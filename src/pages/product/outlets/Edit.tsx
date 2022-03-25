import React, { useLayoutEffect } from "react"
import { useForm } from "react-hook-form"
import CustomInput from "@kiwi/ui/inputs"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import styled from "styled-components"
import { ProductQueryData } from "../../../components/ProductDetailsCard"
import { PageMetaType, ProductPageOutletContext } from "../index"
import ActionButton from "@kiwi/ui/buttons/ActionButton"
import { gql, useMutation } from "@apollo/client"

interface ProductInput {
  name: string
  price: number
  upc: string
}

interface UpdateProductVars {
  upc: string,
  data: Partial<ProductInput>
}

const UpdateProduct = gql`
    mutation UpdateProduct($upc: UPC!, $data: PartialProductInput!) {
        product {
            update(upc: $upc, data: $data) {
                upc
            }
        }
    }
`

function ProductPageEditProduct() {
  const { meta: [ _, setPageMeta ] } = useOutletContext<ProductPageOutletContext<PageMetaType>>()
  const location = useLocation()
  const { product } = location.state as unknown as ProductQueryData
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { isDirty } } = useForm()
  const [ patchMutation, { reset } ] = useMutation<any, UpdateProductVars>(UpdateProduct, {
    refetchQueries: [
      "QueryProductData",
      "QueryProductMetaInfo"
    ]
  })

  const onSubmitHandler = (data: any) => {
    if (isDirty) {
      console.log(data)
      patchMutation({
        variables: {
          upc: product.upc,
          data
        }
      })
        .then(({ data }) => navigate(`/product/${data.product.update.upc}`))
        .catch((error) => {
          console.error(error)
          reset()
        })
    }
  }

  const renderInputsFromState = () => {
    const inputs = []
    for (const [ key, value ] of Object.entries(product)) {
      if (key !== "__typename") {
        inputs.push(<CustomInput
          key={`editProductForm-${key}`}
          label={key}
          type="text"
          inputMode="text"
          autoComplete="false"
          defaultValue={value}
          {...register(key, {
            required: true,
            valueAsNumber: typeof value === "number"
          })}
        />)
      }
    }
    return inputs
  }

  useLayoutEffect(() => {
    setPageMeta({
      title: `Edit ${product.name}`,
      subtitle: product.upc
    })
  }, [])

  return (
    <main>
      <Form id="editProductForm" onSubmit={handleSubmit(onSubmitHandler)}>
        {renderInputsFromState()}
        <ActionButton as="input" type="submit" value="Edit Product"/>
      </Form>
    </main>
  )
}

const Form = styled.form`
  padding: 1rem
`

export default ProductPageEditProduct
