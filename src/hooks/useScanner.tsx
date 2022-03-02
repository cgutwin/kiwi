import React, { useEffect, useRef, useState } from "react"

import Quagga, { QuaggaJSConfigObject, QuaggaJSResultObject } from "@ericblade/quagga2"

export default function useScanner(active: boolean): [
  ref: React.MutableRefObject<HTMLDivElement | null>,
  results: QuaggaJSResultObject | null
] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [ results, setResults ] = useState<QuaggaJSResultObject | null>(null)

  useEffect(() => {
    const config: QuaggaJSConfigObject = {
      inputStream: {
        constraints: {
          // For some reason, the width and height fields affect their counterparts, so the below fixes that.
          // noinspection JSSuspiciousNameCombination
          height: ref?.current?.getBoundingClientRect().width,
          width: ref?.current?.getBoundingClientRect().height,
          facingMode: "environment"
        },
        area: {
          top: "37.5%",    // top offset
          right: "12.5%",  // right offset
          left: "12.5%",   // left offset
          bottom: "37.5%"  // bottom offset
        },
        name: "Live",
        target: ref.current as Element,
        type: "LiveStream"
      },
      locate: false,
      frequency: 1,
      decoder: {
        readers: [ "upc_reader" ],
        multiple: false
      }
    }

    Quagga.init({ ...config })
          .then(() => {
            Quagga.start()
          })
          .catch(err => console.error(err))

    active ? Quagga.onDetected((results) => setResults(results)) : Quagga.offDetected()

    return () => {
      Quagga.stop()
            .catch(() => null)
      Quagga.offDetected()
    }
  }, [ active, ref ])

  return [ ref, results ]
}
