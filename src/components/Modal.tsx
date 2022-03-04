import React from "react"
import ReactDOM from "react-dom"

import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"

/**
 * A modal that appears, covering the entire screen, with a tint and a drawer at the bottom.
 *
 * @param {boolean} open - If the modal is open. Mainly used for the animation.
 * @param {function} closeAction - The callback ran to close the modal.
 * */
function Modal({ open, closeAction, children }: { open: boolean, closeAction: () => void, children: React.ReactNode }) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {open &&
        <ModalContainer>
          <Tint as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeAction}
          />
          <ModalCard as={motion.section}
                     initial={{ y: "100%" }}
                     animate={{ y: "0" }}
                     exit={{ y: "100%" }}
                     transition={{ type: "tween" }}>
            {children}
          </ModalCard>
        </ModalContainer>
      }
    </AnimatePresence>,
    document.getElementById("modal-root") as Element)
}

const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 4;
`

const Tint = styled.div`
  background: rgba(0, 0, 0, 0.8);
  grid-row: 1 / end 3;
  grid-column: 1;
`

const ModalCard = styled.section`
  background: ${({ theme }) => theme.colours.background.hex};
  color: ${({ theme }) => theme.colours.text.main};
  border-radius: 1rem 1rem 0 0;
  grid-area: card;
  padding: 1rem 1rem max(3rem, env(safe-area-inset-bottom));
  grid-column: 1;
`

export default Modal
