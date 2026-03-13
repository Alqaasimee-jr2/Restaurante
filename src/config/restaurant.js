// Central restaurant configuration — swap this file to rebrand the template
const restaurant = {
  name: 'Saveur',
  tagline: 'Nigerian Soul · Continental Craft',
  description:
    'Where the bold, aromatic flavours of Nigeria meet the refined elegance of continental cuisine. Every plate tells a story of two traditions united by a love of great food.',
  address: '12 Victoria Island Boulevard, Lagos, Nigeria',
  phone: '+234 812 345 6789',
  whatsapp: '+2348123456789',
  email: 'hello@saveur.ng',
  hours: [
    { day: 'Monday – Friday', time: '11:00 AM – 10:00 PM' },
    { day: 'Saturday', time: '12:00 PM – 11:00 PM' },
    { day: 'Sunday', time: '12:00 PM – 9:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com/saveur_ng',
    facebook: 'https://facebook.com/saveurng',
    twitter: 'https://twitter.com/saveur_ng',
    tiktok: 'https://tiktok.com/@saveur_ng',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7272!2d3.4226!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMiJOIDPCsDI1JzIxLjQiRQ!5e0!3m2!1sen!2sng!4v1',
  copyright: `© ${new Date().getFullYear()} Saveur. All rights reserved.`,
};

export default restaurant;
