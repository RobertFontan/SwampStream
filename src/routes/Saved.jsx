import React, {useState, useEffect} from 'react'

import Video from '../components/Video'
import supabase from '../config/supabaseClient'

function Saved() {
  // saved is array of videos 
  const [saved, setSaved] = useState(null)

  // get info from supabase
  useEffect(() =>{
    const fetchData = async () => {
      const {data, error} = await supabase
      .from('Saved')
      .select('*')

      // updates array of saved videos
      setSaved(data)

    }
    fetchData()
  }, []) 





  return (
    <div>Saved
      {saved && saved.map((elementInArray) => <Video video={elementInArray}/>)}
    </div>
  )
}

export default Saved