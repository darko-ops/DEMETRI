// src/sections/BlogSection.jsx
import React from 'react';
import SectionLayout from '../components/SectionLayout';
import PageHeader from '../components/PageHeader';
import { SECTION_CONTENT } from '../utils/constants';

const BlogSection = () => {
  const content = SECTION_CONTENT.blog;

  return (
    <SectionLayout 
      label={content.label}
      quoteText="WRITING IS THINKING.\nTO WRITE WELL IS TO\nTHINK CLEARLY."
      quoteAuthor="DAVID MCCULLOUGH"
    >
      <PageHeader 
        subtitle={content.subtitle}
        description={content.description}
      />
    </SectionLayout>
  );
};

export default BlogSection;