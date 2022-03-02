import React, { useEffect, useState } from "react"

import { motion, useAnimation } from "framer-motion"
import styled from "styled-components"

/**
 * Given string-based children, CopyInnerText will wrap it, allowing click-to-copy functionality.
 * */
function CopyInnerText({ children }: { children: string }) {
  const copiedNotificationText = "Copied!"
  const [ value, setValue ] = useState(children)
  const controls = useAnimation()

  const variants = {
    initial: {
      opacity: [ 0, 1 ],
      y: [ 10, 0 ]
    },
    copied: {
      opacity: [ 0, 1 ],
      y: [ 10, 0 ]
    }
  }

  useEffect(() => {
    return () => {
      controls.stop()
    }
  }, [])

  const copyHandler = (value: string) => {
    // navigator.clipboard.writeText needs no permissions, yet requires a secure context.
    navigator.clipboard.writeText(value)
             .then(() => {
               // use a promise chain to time the animation and set what is contained within the element.
               controls.start("copied")
               setValue(copiedNotificationText)
               return new Promise(resolve => setTimeout(resolve, 3000))
             })
             .then(() => {
               controls.start("initial")
               setValue(children)
             })
  }


  return (
    <InlineBlockSpan as={motion.span}
                     animate={controls}
                     variants={variants}
                     transition={{ duration: 0.3 }}
      // Don't run the copyHandler if the copiedNotificationText is displayed. It should be set as
      // the value at this point from the then-chain above; value will differ from the children, being the content you
      // want to copy.
                     onClick={() => value === children ? copyHandler(value) : null}>
      {value}
    </InlineBlockSpan>
  )
}

const InlineBlockSpan = styled.span`
  display: inline-block;
  width: 100%;
`

export default CopyInnerText
