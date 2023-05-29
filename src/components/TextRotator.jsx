import React, { useEffect, useState, useContext } from 'react';
import noteContext from '../context/Notes/noteContext';

const TextRotator = (props) => {


const context = useContext(noteContext);
const {getUser} = context;

 const [u, setu] = useState({name:'',email:'', password:''});
  const texts = [`Welcome ${u.name}`, 'What would you like to do ?', 'We have got all your notes!']; // Array of texts to rotate
  const intervalTime = 2000; // Interval time in milliseconds

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(texts[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setFade(true); // Enable fading effect
      setTimeout(() => setFade(false), 500);
      const user1 = await getUser();
      setu(user1);

    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCurrentText(texts[currentIndex]);
  }, [currentIndex]);

  return <h1 className="" style={{color:'black', transition: 'opacity 0.5s ease-in-out', opacity: fade ? 0 : 1 }}>{currentText}</h1>;
};

export default TextRotator;