import React ,{useState,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Mypopup(props){

  const [open, setOpen] = useState(false);
  const [popupdata, setPopupdata] = useState("inital");
  const closeModal = () => setOpen(false);
  const openClicked = () => setOpen(true);

  useEffect( () => {
    if(props.openClicked){
      setOpen(true);
      setPopupdata(props.setPopupdata);
    }
  },[props.openClicked,props.setPopupdata])


return (<div>

  <Popup open={open}  closeOnDocumentClick onClose={closeModal} onClick={openClicked}  position="right top" modal="true"
   repositionOnResize="true" keepTooltipInside="true" offsetX="10">
<div className="popupdata"><br/>{popupdata}<br/><br/></div>
</Popup>

</div>
)}
export default Mypopup;
