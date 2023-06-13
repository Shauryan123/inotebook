import React, { useContext, useEffect } from 'react';
import Profile from './Profile';
import Module from './Module';
import './Dashboard.css';
import noteContext from '../context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote, showAlert, getUser } = context;

    // console.log(user.name);
    useEffect(() => {
      if (localStorage.getItem("token")) {
        // console.log("HI I AM" + " " + localStorage.getItem('token'));
        getUser();
      } else {
        navigate("/login");
      }

      // eslint-disable-next-line
    }, []);

  const modules = [
    { id: 1, title: 'Data Discovery & Integration', description: 'Seamlessly integrate activity, emission, factor or invoice data to the ESG insights tool.', image: 'https://www.datapine.com/blog/wp-content/uploads/2019/02/data-discovery-laptop.jpg' },
    { id: 2, title: 'Lets Analyze', description: 'Utilize existing data create custom visualisation for effective data communication and share to other users to enable collaboration', image:'https://learn.g2.com/hubfs/Imported%20sitepage%20images/1ZB5giUShe0gw9a6L69qAgsd7wKTQ60ZRoJC5Xq3BIXS517sL6i6mnkAN9khqnaIGzE6FASAusRr7w=w1439-h786.png' },
    { id: 3, title: 'My Reports', description: 'View the prebuilt point-in-time compliance report on ESG related metrics for carbon emission and social related material topics', image:'https://www.searchenginejournal.com/wp-content/uploads/2020/01/marketing-reports-5e0f54085b56c.png' },
    { id: 4, title: 'Lets Simulate', description: 'Explore intiative options for me to reach my ESG target through simulation', image:'https://www.oceanclock.com/img/cms/blog/Formation%20neige/comment%20se%20forme%20la%20neige.jpg' },
    { id: 6, title: 'Quality and Assurance', description: 'Trace the data lineage for each ESG metric', image:'https://toxsl.com/blog/image/77/post-image_file-QUALITY_ASSURANCE.png' },
    { id: 5, title: 'ESG targets', description: 'Explore various ESG targets options and recieve recommendations on which area I should prioritize.', image:'https://uploads-ssl.webflow.com/604915c3f8006b714c1fa12d/62860c9e66ee75e65f466c7f_esg%20climate%20action(1).jpg' }
  ];

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       // console.log("HI I AM" + " " + localStorage.getItem('token'));
//       getUser();
//       console.log("USERRRR" + " " + user);
//     } else {
//       navigate("/login");
//     }

//     // eslint-disable-next-line
//   }, []);

  return (
    <div className="background-image2">
        <div className="dashboard">
      <Profile/>
      <div className="container">

                    <div className="row align-items-center">
                        {modules.map((element) => {
                            return <div className="col-md-6">
                                <Module title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.image ? element.image : "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"}/>
                            </div>
                        })}
                    </div>
                    </div>
    </div>
    </div>

  );
};

export default Dashboard;
