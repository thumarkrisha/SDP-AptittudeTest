import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseurl } from '../services/Url';

export default function AddQue() {

  const navigate = useNavigate();

    const courseOptions = ['Select a course',
    'Programming Fundamentals',
    'Data Structures and Algorithms',
    'Database Management Systems (DBMS)',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Web Development',
    'Cybersecurity',
    'Logical Reasoning',
    'Data Interpretation',
    'Verbal Reasoning',
    'Arithmetic Aptitude',]; 

    const { testId } = useParams();

    const [formData, setFormData] = useState({
        courseID: '',
        question: '',
        weightage: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'weightage') {
          const newValue = Math.min(5, Math.max(0, value));
          setFormData((prevData) => ({ ...prevData, [name]: newValue }));
        } else {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
          await axios.post(`${baseurl}/test/${testId}/addQuestion`, formData);
          setFormData({
            courseID: '',
            question: '',
            weightage: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
          });
          
          const response = await axios.get(`${baseurl}/test/${testId}/marks`);
          console.log(response.data);
          let updatedSubjectWiseMarks = response.data.subjectWiseMarks? [...response.data.subjectWiseMarks]:[];
          console.log(updatedSubjectWiseMarks);
          const subjectIndex = updatedSubjectWiseMarks? updatedSubjectWiseMarks.findIndex(subject => subject.subject === formData.courseID):-1;

        if (subjectIndex !== -1) {
            updatedSubjectWiseMarks[subjectIndex].marks += parseInt(formData.weightage);
            updatedSubjectWiseMarks[subjectIndex].number+=1;
            response.data.totalMarks += parseInt(formData.weightage);
        } else {
            updatedSubjectWiseMarks.push({
                subject: formData.courseID,
                number: 1,
                marks: parseInt(formData.weightage)
            });
            console.log(updatedSubjectWiseMarks);
            response.data.totalMarks += parseInt(formData.weightage);
        }

        await axios.put(`${baseurl}/test/${testId}/update`, {
            subjectWiseMarks: updatedSubjectWiseMarks,
            totalMarks: response.data.totalMarks
        });

        } catch (error) {
          console.log(error);
        }

      };
    
      return (
      <>
      <button className='back-button' onClick={()=>navigate("/professordashboard")}>
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back To DashBoard</span>
        </button>
        <div className="add-que-container">
          <h2 className='gradient-underline' >ADD QUESTION</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="add-que">
            <label htmlFor="courseID">Course</label>
            <select
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Select a course"
             
          >
            {courseOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
    
            <div  className="add-que">
              <label htmlFor="question">Question</label>
              <textarea
                type="text"
                name="question"
                rows={5}
                value={formData.question}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Write Question here..."
              />
            </div>

            <div  className="add-que">
              <label htmlFor="weightage">Weightage (Out of 5)</label>
              <input
                type="text"
                name="weightage"
                value={formData.weightage}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give weightage to a question'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option1">Option 1</label>
              <input
                type="text"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 1'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option2">Option 2</label>
              <input
                type="text"
                name="option2"
                value={formData.option2}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 2'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option3">Option 3</label>
              <input
                type="text"
                name="option3"
                value={formData.option3}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 3'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option4">Option 4</label>
              <input
                type="text"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 4'
              />
            </div>
    
            <div  className="add-que">
              <label htmlFor="answer">Answer</label>
              <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give correct answer here...'
              />
            </div>
    
            <div className='add-que'>
              <button type="submit" className="submit" >
                ADD
              </button>
            </div>
          </form>
        </div>
      </>
  )
}
