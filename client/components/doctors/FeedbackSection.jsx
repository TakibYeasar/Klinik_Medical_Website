const FeedbackSection = ({ feedbacks }) => (
    <div id="feedback" className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold">Patient Feedback</h3>
        <ul className="mt-2">
            {feedbacks.map((feedback, index) => (
                <li key={index} className="border-b py-2">
                    <strong>{feedback.patient}</strong>: {feedback.feedback}
                </li>
            ))}
        </ul>
    </div>
);

export default FeedbackSection;
