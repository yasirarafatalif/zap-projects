import React from 'react';
import Container from '../../../Comeponents/Shared/Container';
const faqs = [
    {
        q: 'How does this posture corrector work?',
        a: `A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.`,
    },
    {
        q: 'Is it suitable for all ages and body types?',
        a: 'Yes, posture correctors are typically adjustable and designed to fit different body shapes and ages.',
    },
    {
        q: 'Does it really help with back pain and posture improvement?',
        a: 'It can help improve posture over time when used correctly, but consistency matters.',
    },
    {
        q: 'Does it have smart features like vibration alerts?',
        a: 'Some models include vibration reminders, depending on the product version.',
    },
    {
        q: 'How will I be notified when the product is back in stock?',
        a: 'You will receive an email or app notification once the product becomes available again.',
    },
]
const FQAQuestion = () => {
    return (
        <Container>
            <div className="w-full  mx-auto py-12 text-center">
            {/* Title */}
            <h2 className="text-3xl font-bold text-teal-900 mb-3">Frequently Asked Question (FAQ)</h2>
            {/* Subtitle */}
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>


            {/* FAQ Items */}
            <div className="space-y-3 text-left">
                {faqs.map((item, i) => (
                    <div key={i} className="collapse collapse-arrow bg-base-100 rounded-xl border border-gray-200 shadow-sm">
                        <input type="checkbox" defaultChecked={i === 0} />
                        <div className="collapse-title text-lg font-semibold text-teal-900">
                            {item.q}
                        </div>
                        <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                            <p>{item.a}</p>
                        </div>
                    </div>
                ))}
            </div>


            {/* Button */}
            <button className="btn mt-8 bg-lime-300 hover:bg-lime-400 text-teal-900 font-semibold rounded-full px-8 border-none">
                See More FAQ's
                <span className="ml-2 text-xl">➜</span>
            </button>
        </div>
        </Container>
    );
};

export default FQAQuestion;