import React, { useEffect, createRef } from "react"

import './styles.css'

const Toster = ({ show = false }) => {
    const ref = createRef();
    const timer = () => setTimeout(() => {
        return ref.current && ref.current.classList.remove('show')
      }, 5000);

    useEffect(() => {

      show && timer()

        return () => clearTimeout(timer);
      }, [ show ]);

    return (
        <div className={`toster ${show && 'show'}`} ref={ref}>Job has been created successfully!</div>
    )
}

export default Toster