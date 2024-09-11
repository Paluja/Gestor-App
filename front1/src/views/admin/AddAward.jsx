import { Formik } from 'formik';
import { initialAddAwardValues } from '../../formUtils/formValues';
import { addAwardSchema } from '../../formUtils/formSchema';
import Input from '../../formUtils/Input';
import { Form } from 'formik';
import { useAuth } from '../../hooks/AuthAdminContext';
import { useAwardContext } from '../../hooks/AwardContext';
import { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { io } from 'socket.io-client';




function AddAward() {
  const { jwtAdmin } = useAuth();
  const [unAwards, setUnAwards] = useState([]);
  const [awards, setAwards] = useState([]);
  const { getUnachivedAwards, getAchivedAwards } = useAwardContext();
  const socket = io('http://localhost:3000'); 
  
  
  const handleSubmit = async (values, actions) => {
    console.log(values);
    
    try {
      const response = await fetch('http://localhost:3000/awards/add-award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtAdmin,
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          total_points: values.total_points,
        })
      });
      console.log(jwtAdmin)
      if (response.status == 200){
        console.log('Award added successfully');
        socket.emit('awardAdded',{
          name: values.name,
          description: values.description,
          total_points: values.total_points,});
      } else {
        console.error('Failed to add award');
      }
    } catch (error) {
      console.error('Error adding award:', error);
    }
    actions.resetForm();
  }

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getUnachivedAwards();
        setUnAwards(data);
      } catch (error) {
        console.error('Error fetching awards', error);
      }
    };
    fetchAwards();
  }, [getUnachivedAwards]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getAchivedAwards();
        setAwards(data);
      } catch (error) {
        console.error('Error fetching awards', error);
      }
    };
    fetchAwards();
  }, [getAchivedAwards]);

  return (
    <>
      <div className="awards-container">
          <h2>Premios por conseguir</h2>
          <div className="awards-bx">              
              {unAwards.length > 0 ? unAwards.map((award) => (
                <div key={award.id_award} className='awards-card'>
                  <div className="award-content">
                    <h4 className='award-title'>{award.name}</h4>
                    <p className='award-points'>{award.total_points } / {award.points_earned}</p>
                  </div>
                  <div className="progressBar-bx">
                    <ProgressBar progress={
                      (award.points_earned / award.total_points * 100) ? Math.floor(award.points_earned / award.total_points * 100) : 0
                      } />  
                  </div>   
                </div>
              )) : <h4>No hay premios disponibles</h4>}

          </div>
        </div>

      <h2 className='title-formAward'>Añadir nuevo premio</h2>
      <Formik
        initialValues={initialAddAwardValues}
        onSubmit={handleSubmit}
        validationSchema={addAwardSchema}
      >
        {({ isSubmitting}) => (
          <>
          <Form>
            <Input label="Premio" name="name" type="text" required/>
            <Input label="Descripcion" name="Descripcion" type="text" />
            <Input label="Total Points" name="total_points" type="number" required />
            <button  className='btn-task'  disabled={isSubmitting} type="submit">
              Añadir
            </button>

          </Form>
        </>
        )}
      </Formik>
    
      <div className="awards-container">
          <h2>Premios conseguidos</h2>
          <div className="awards-bx">              
              {awards.length > 0 ? awards.slice(-5).map((award) => (
                <div key={award.id_award} className='awards-card'>
                  <div className="award-content">
                    <h4 className='award-title'>{award.name}</h4>
                    <p className='award-points'>{award.total_points } / {award.total_points}</p>
                  </div>
                  <div className="progressBar-bx">
                    <ProgressBar progress={
                      (award.points_earned / award.total_points * 100) ? Math.floor(award.points_earned / award.total_points * 100) : 0
                      } />  
                  </div>   
                </div>
              )) : <h4>No hay premios disponibles</h4>}

          </div>
        </div>
    
    
    </>

    
  )
}

export default AddAward