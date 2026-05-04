import React, { useMemo, useState } from 'react';
import '../../styles/EventCarousel.css';

export default function EventCarousel({ notes = [] }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Dados de exemplo de eventos do Host
  const hostEvents = [
    {
      id: 1,
      title: 'Reunião Ambiental',
      date: '22 de Janeiro',
      time: '10:30',
      location: 'Sala de Reuniões - SEMADES',
      icon: '📋',
      color: 'blue',
      contact: '(67) 3314-8000',
      link: 'https://www.semadesc.ms.gov.br'
    },
    {
      id: 2,
      title: 'Inspeção de Áreas Verdes',
      date: '25 de Janeiro',
      time: '14:00',
      location: 'Parque das Nações',
      icon: '🌳',
      color: 'green',
      contact: '(67) 3314-8001',
      link: 'https://www.semadesc.ms.gov.br/parques'
    },
    {
      id: 3,
      title: 'Workshop de Sustentabilidade',
      date: '28 de Janeiro',
      time: '09:00',
      location: 'Auditório Central',
      icon: '♻️',
      color: 'teal',
      contact: '(67) 3314-8002',
      link: 'https://www.semadesc.ms.gov.br/workshop'
    },
    {
      id: 4,
      title: 'Palestra de Recursos Hídricos',
      date: '02 de Fevereiro',
      time: '15:30',
      location: 'Centro de Treinamento',
      icon: '💧',
      color: 'cyan',
      contact: '(67) 3314-8003',
      link: 'https://www.semadesc.ms.gov.br/recursos'
    },
    {
      id: 5,
      title: 'Visita Técnica',
      date: '05 de Fevereiro',
      time: '08:00',
      location: 'Zona de Proteção Ambiental',
      icon: '🔍',
      color: 'purple',
      contact: '(67) 3314-8004',
      link: 'https://www.semadesc.ms.gov.br/visitas'
    },
  ];

  const noteEvents = useMemo(() => {
    return notes
      .filter((note) => note?.date instanceof Date)
      .map((note, index) => {
        const day = String(note.date.getDate()).padStart(2, '0');
        const month = String(note.date.getMonth() + 1).padStart(2, '0');
        const year = note.date.getFullYear();
        const firstLink = (note.attachments || []).find(
          (att) => att?.type === 'link' && att?.url
        );

        return {
          id: `note-${note.id || index}`,
          title: note.title || `Nota ${day}/${month}`,
          date: `${day}/${month}/${year}`,
          time: 'Sem horário',
          location: note.note ? note.note : 'Nota adicionada no calendário',
          icon: '📝',
          color: 'teal',
          contact: '',
          link: firstLink?.url || '',
          isUserNote: true,
        };
      });
  }, [notes]);

  const allEvents = [...noteEvents, ...hostEvents];

  return (
    <section className="event-carousel-section">
      <h2 className="carousel-title">Eventos</h2>
      
      <div className="events-carousel-wrapper">
        <div className="events-carousel-track">
          {/* Duplicamos os eventos para criar efeito contínuo */}
          {[...allEvents, ...allEvents].map((event, idx) => (
            <div 
              key={`${event.id}-${idx}`} 
              className={`event-card event-card-${event.color}`}
            >
              <div className="event-card-header">
                <span className="event-icon">{event.icon}</span>
                <h3 className="event-title">{event.title}</h3>
              </div>
              
              <div className="event-card-body">
                <div className="event-info">
                  <div className="info-row">
                    <span className="info-label">📅</span>
                    <span className="info-text">{event.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">🕐</span>
                    <span className="info-text">{event.time}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">📍</span>
                    <span className="info-text">{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="event-card-footer">
                <button className="event-btn" onClick={() => setSelectedEvent(event)}>Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-gradient-left"></div>
      <div className="carousel-gradient-right"></div>

      {/* ===== MODAL DE DETALHES DO EVENTO ===== */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="event-modal-close" onClick={() => setSelectedEvent(null)}>✕</button>
            
            <div className="event-modal-header">
              <span className="event-modal-icon">{selectedEvent.icon}</span>
              <h2 className="event-modal-title">{selectedEvent.title}</h2>
            </div>

            <div className="event-modal-content">
              <div className="modal-info-group">
                <h3>Detalhes do Evento</h3>
                
                <div className="modal-info-item">
                  <span className="modal-info-icon">📅</span>
                  <div className="modal-info-details">
                    <span className="modal-label">Data</span>
                    <span className="modal-value">{selectedEvent.date}</span>
                  </div>
                </div>

                <div className="modal-info-item">
                  <span className="modal-info-icon">🕐</span>
                  <div className="modal-info-details">
                    <span className="modal-label">Horário</span>
                    <span className="modal-value">{selectedEvent.time}</span>
                  </div>
                </div>

                <div className="modal-info-item">
                  <span className="modal-info-icon">📍</span>
                  <div className="modal-info-details">
                    <span className="modal-label">Local</span>
                    <span className="modal-value">{selectedEvent.location}</span>
                  </div>
                </div>

                {selectedEvent.contact && (
                  <div className="modal-info-item">
                    <span className="modal-info-icon">📞</span>
                    <div className="modal-info-details">
                      <span className="modal-label">Contato</span>
                      <span className="modal-value">
                        <a href={`tel:${selectedEvent.contact}`}>{selectedEvent.contact}</a>
                      </span>
                    </div>
                  </div>
                )}

                {selectedEvent.link && (
                  <div className="modal-info-item">
                    <span className="modal-info-icon">🔗</span>
                    <div className="modal-info-details">
                      <span className="modal-label">Link</span>
                      <span className="modal-value">
                        <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">
                          Acessar
                        </a>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="event-modal-footer">
              <button className="modal-btn-close" onClick={() => setSelectedEvent(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
