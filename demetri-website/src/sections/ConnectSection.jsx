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
      quoteText="ALONE WE CAN DO\nSO LITTLE; TOGETHER\nWE CAN DO SO MUCH."
      quoteAuthor="HELEN KELLER"
    >
      <PageHeader 
        subtitle={content.subtitle}
        description={content.description}
      />
      <ContactList />
    </SectionLayout>
  );
};

export default ConnectSection;