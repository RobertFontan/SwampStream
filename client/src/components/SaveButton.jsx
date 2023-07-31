import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import supabase from '../config/supabaseClient'

function SaveButton({title, videoID, videoData}) {

    const [saved, setSaved] = useState(null)
    // a lot of this adapted from robert's code for notes, my bad
    //const [saved, setSaved] = useState(null)


    // getting saved video
    // renders from prevous page
    useEffect(() => {
        const fetchData = async () =>{
            const { data, error } = await supabase
            .from('Saved')
            .select('videoId')
            .eq('videoId', videoID)

            if (data) {
                setSaved(true)
               console.log('saved', data)
            }
            if (error) {
                setSaved(false)
                console.log('error', error)
                //console.log(title)
                //console.log(videoId)
            }
        } 
        fetchData()
    }, [])
    
  const handleSave = async () => {
    if (!saved) {
        const {data, error} = await supabase
        .from('Saved')
        .insert({ 'videoId': videoID, 'title': title, 'thumbnail': videoData.thumbnails.medium.url })
        console.log(data)
        console.log(title)
        console.log(videoID)
    
        if (data) {
            console.log(data)
        }
        if (error) {
            alert('Will be removing from saved...')
            console.log('error', error)
            setSaved(false);
        }
        else {
            alert('Successful save!')
            setSaved(true);
        }
    }
    else {
        const { error } = await supabase
            .from('Saved')
            .delete()
            .eq('videoId', videoID)
            setSaved(false);
            console.log('Unsaved video.')
    }
  }



  return (
    <div className="saved-button">
        {
            saved ? <Button onClick={handleSave} variant="light" size="sm"> { 'Unsave Video'} </Button>
             : <Button onClick={handleSave} variant="dark" size="sm"> { 'Save Video'} </Button>
        }
    </div>

  )
}
export default SaveButton