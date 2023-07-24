import React, {useState, useEffect} from 'react'

import supabase from '../config/supabaseClient'

function Saved() {
  const [saved, setSaved] = useState(null)
  // get info from supabase
  useEffect(() =>{
    const fetchData = async () => {
      const {data, error} = await supabase
      .from('Saved')
      .select('videoid')

      console.log(data)

    }
  })





  return (
    <div>Saved</div>
  )
}

export default Saved