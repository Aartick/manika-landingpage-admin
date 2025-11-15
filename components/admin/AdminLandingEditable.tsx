'use client';

import { useState } from 'react';

function EditableWrapper({
  children,
  sectionId,
}: {
  children: React.ReactNode;
  sectionId: string;
}) {
  const [visible, setVisible] = useState(true); // Load real visibility from API/props in real app

  const handleEdit = () => {
    alert(`Edit ${sectionId} section clicked`);
  };

  const handleToggleVisible = () => {
    setVisible(!visible);
    alert(`Toggled visibility of ${sectionId} to ${!visible}`);
    // Call API here to save visibility
  };

  const handleCopy = () => {
    alert(`Copy ${sectionId} section clicked`);
    // Call API to duplicate section
  };

  return (
    <div
      className={`relative p-5 border rounded-xl mb-6 ${
        visible ? 'bg-beige border-[#C2A570]' : 'bg-gray-200 border-gray-400 opacity-70'
      }`}
    >
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={handleEdit} className="btn-secondary text-sm">
          Edit
        </button>
        <button onClick={handleToggleVisible} className="btn-tertiary text-sm">
          {visible ? 'Hide' : 'Show'}
        </button>
        <button onClick={handleCopy} className="btn-secondary text-sm">
          Copy
        </button>
      </div>
      {children}
    </div>
  );
}

export default function AdminLandingEditable() {
  return (
    <div className="text-dark-brown bg-background px-6 py-10 max-w-7xl mx-auto">
      <EditableWrapper sectionId="hero">
        {/* Paste your Hero Section JSX here */}
        <section className="bg-beige py-20 flex flex-col items-center">
          {/* ... replicate hero section JSX from landing page ... */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark-brown leading-tight">
            Heal the Wound of Not-Enoughness
          </h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-dark-brown font-light">
            A 90-minute somatic shadow-work workshop for women ready to release guilt, shame,
            and self-criticism
          </h2>
        </section>
      </EditableWrapper>


      {/* Repeat for all other sections */}
    </div>
  );
}
