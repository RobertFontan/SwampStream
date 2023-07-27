import React from 'react'

import Video from '../components/Video'
import supabase from '../config/supabaseClient'

function History() {
/*  // saved is array of videos 
  const [history, setHistory] = useState(null)

  // get info from supabase
  useEffect(() =>{
    const fetchData = async () => {
      const {data, error} = await supabase
      .from('History')
      .select('*')

      // updates array of saved videos
      setHistory(data)

    }
    fetchData()
  }, []) */
  //{history && history.map((elementInArray) => <Video video={elementInArray}/>)}





  return (
    <div>History
    </div>
  )
}

export default History