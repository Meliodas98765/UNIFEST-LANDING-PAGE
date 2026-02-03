import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is the ₹499 pre-booking amount refundable?',
    answer: 'Yes, if you choose not to buy, the amount can be refunded to your source account within 7 days of store opening. However, you will lose the launch benefits.',
  },
  {
    question: 'How do I redeem my pre-booking?',
    answer: 'Simply visit the One Horizon Center store with your pre-booking confirmation email and valid ID. Our team will assist you in completing your purchase and applying all your exclusive benefits.',
  },
  {
    question: 'Will I receive an invoice on email?',
    answer: 'Yes, you will receive a GST invoice on your registered email address immediately after successful payment. This invoice can be used for reimbursement or warranty purposes.',
  },
  {
    question: 'Can I change my selected product later?',
    answer: 'Yes, you can change your selected product when you visit the store. However, the availability of specific models and configurations will depend on stock at the time of your visit.',
  },
];

export function FAQ() {
  return (
    <section className="w-full bg-slate-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-dark mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-2xl border border-slate-100 px-6 overflow-hidden data-[state=open]:shadow-card"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium text-brand-dark hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
