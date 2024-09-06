import { Formik } from 'formik';
import { initialAddAwardValues } from '../../formUtils/formValues';
import { addAwardSchema } from '../../formUtils/formSchema';
import Input from '../../formUtils/Input';
import { Form } from 'formik';
import { useAuth } from '../../hooks/AuthAdminContext';
import { useAwardContext } from '../../hooks/AwardContext';
import { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar';


function AddAward() {
  const { jwtAdmin } = useAuth();
  const [awards, setAwards] = useState([]);
  const { getUnachivedAwards } = useAwardContext();
  console.log(jwtAdmin);
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
      if (response.status == 200){
        console.log('Award added successfully');
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
        setAwards(data);
      } catch (error) {
        console.error('Error fetching awards', error);
      }
    };
    fetchAwards();
  }, [getUnachivedAwards]);

  return (
    <>
      <div className="awards-container">
          <h2>Premios por conseguir</h2>
          <div className="awards-bx">              
              {awards.length > 0 ? awards.map((award) => (
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

      <h1>Add Award</h1>
      <Formik
        initialValues={initialAddAwardValues}
        onSubmit={handleSubmit}
        validationSchema={addAwardSchema}
      >
        {({ isSubmitting, values, errors }) => (
          <>
          <Form>
            <Input label="Name" name="name" type="text" required/>
            <Input label="Description" name="description" type="text" required />
            <Input label="Total Points" name="total_points" type="number" required />
            <button  disabled={isSubmitting} type="submit">
              Add Award
            </button>

          </Form>
        <pre style={{ color: "black" }}>
          {JSON.stringify({ values,  errors }, null, 1)}
        </pre>
        </>
        )}
      </Formik>
    </>
  )
}

export default AddAward