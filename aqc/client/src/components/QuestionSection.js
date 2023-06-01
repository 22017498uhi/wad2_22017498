import React, { useEffect, useState } from 'react'

function QuestionSection({ questionText }) {
    const [imageUri, setImageUri] = useState(null) // Not needed for this assignment

    return (
        <div className="col-sm">
            <div className="p-3 mb-2 bg-light">
                <div className="text-center">
                    {imageUri && <img className="mb-4 rounded img-fluid" src={imageUri} />}
                </div>
                <p>{questionText}</p>
            </div>
        </div>
    );
  }
  
  export default QuestionSection;
