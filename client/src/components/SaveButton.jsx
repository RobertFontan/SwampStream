import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import supabase from '../config/supabaseClient'

function SaveButton({title, videoID, videoData, saveData}) {

    const [saved, setSaved] = useState(null)
    // a lot of this adapted from robert's code for notes, my bad
    //const [saved, setSaved] = useState(null)


    // getting saved video
    // renders from prevous page
    
    // duration, date, class code
    console.log('SAVE', saveData)
    
    // yyyy/mm/dd

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}/${month}/${day}`;
    }

    function iso8601ToSeconds(duration) {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/; // Regular expression to parse the duration
        const matches = duration.match(regex);
      
        if (!matches) {
          throw new Error('Invalid ISO 8601 time format.');
        }
      
        const hours = matches[1] ? parseInt(matches[1], 10) : 0;
        const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
        const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
      
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds;
    }

    useEffect(() => {
        const fetchData = async () =>{
            const { data, error } = await supabase
            .from('Saved')
            .select('*')
            .eq('videoID', videoID)

            if (data) {
                console.log('SAVE BUTTON', data)
                if(data.length == 0){
                    setSaved(false)
                }
                else{
                    setSaved(true)
                    console.log('saved', data)
                }
            }
            if (error) {
                setSaved(false)
                console.log('error', error)
            }
        } 
        fetchData()
    }, [])
    
  const handleSave = async () => {
    if (!saved) {
        const {data, error} = await supabase
        .from('Saved')
        .insert({ 'videoID': videoID, 'title': title, 'thumbnail': videoData.thumbnails.medium.url, 'date': formatDate(saveData[1]), 'length': iso8601ToSeconds(saveData[0]), 'class': saveData[2]})
        console.log(data)

        if (data) {
            console.log(data)
        }
        if (error) {
            alert('Will be removing from saved...')
            console.log('error', error)
            setSaved(false);
        }
        else {
            console.log(data)
            alert('Successful save!')
            setSaved(true);
        }
    }
    else {
        const { error } = await supabase
            .from('Saved')
            .delete()
            .eq('videoID', videoID)
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