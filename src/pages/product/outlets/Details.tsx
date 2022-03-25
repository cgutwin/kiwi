import React, { useEffect, useState } from "react"
import ProductDetailsCard from "../../../components/ProductDetailsCard"
import { useOutletContext } from "react-router-dom"
import { PageMetaType, ProductPageOutletContext } from "../index"
import ProductExpiryCard from "../../../components/ProductExpiryCard"
import ProductExpiredCard from "../../../components/ProductExpiredCard"
import ActionButton from "@kiwi/ui/buttons/ActionButton"
import { Modal } from "@kiwi/components"
import NewExpiryModal from "../modals/NewExpiryModal"

function ProductPageDetails() {
  const { data, meta: [ _, setPageMeta ] } = useOutletContext<ProductPageOutletContext<PageMetaType>>()
  const [ creatingExpiry, setCreatingExpiry ] = useState(false)

  useEffect(() => {
    if (data) setPageMeta({
      title: data.product.name,
      subtitle: data.product.upc
    })

    return () => {}
  }, [ data ])

  return (
    <React.Fragment>
      <main style={{
        marginBottom: "7rem"
      }}>
        <ProductExpiredCard/>
        <ProductDetailsCard/>
        <ProductExpiryCard/>
        <ActionButton onClick={() => setCreatingExpiry(true)}>New Expiry</ActionButton>
      </main>
      <Modal open={creatingExpiry} closeAction={() => setCreatingExpiry(prevState => !prevState)}>
        <NewExpiryModal close={() => setCreatingExpiry(prevState => !prevState)}/>
      </Modal>
    </React.Fragment>
  )
}

export default ProductPageDetails
