// src/sections/ConnectSection.jsx
import React from 'react';
import SectionLayout from '../components/SectionLayout';
import PageHeader from '../components/PageHeader';
import ContactList from '../components/ContactList';
import { SECTION_CONTENT } from '../utils/constants';

const ConnectSection = () => {
  const content = SECTION_CONTENT.connect;

  return (
    <SectionLayout 
      label={content.label}
      quoteText="DESTRUCTION IS A FORM OF CREATION."
      quoteAuthor="GRAHAM GREENE"
    >
      <PageHeader 
        subtitle={content.subtitle}
      />
      <ContactList />
    </SectionLayout>
  );
};

export default ConnectSection;