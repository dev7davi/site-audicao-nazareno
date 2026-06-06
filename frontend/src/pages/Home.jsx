import React from 'react';
import { FormWizard } from '../components/FormWizard';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { InfoCard } from '../components/InfoCard';
import { CheckCircle, Music, Mic2 } from 'lucide-react';

export const Home = () => {
  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>
      {/* 1. HERO SECTION */}
      <section className="hero-section bg-grid">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content" style={{ zIndex: 10 }}>
          <span className="hero-subtitle">Tabernáculo Music</span>
          <h1>Audição</h1>
          <p className="hero-description">
            Mais do que músicos, buscamos ministros comprometidos com Deus e com o chamado para servir no altar.
          </p>
          <a href="#inscricao" className="btn-primary">
            Realizar Inscrição
          </a>
        </div>
      </section>

      {/* 2. APRESENTAÇÃO - BLOCO AZUL (REFERÊNCIA RE-CHORDS) */}
      <section className="bg-accent">
        <div className="container">
          <div className="presentation-grid">
            <div>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem', display: 'block' }}>
                O Chamado
              </span>
              <h2 style={{ color: '#000' }}>Servir com Excelência</h2>
              <p style={{ color: '#111', fontWeight: 500, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}>
                Este não é apenas um processo musical, mas profundamente espiritual. O altar exige mais do que talento — exige caráter, submissão, coração ensinável e alinhamento com os princípios do Reino.
              </p>
              <br/>
              <a href="#inscricao" className="btn-primary" style={{ background: '#000', color: '#fff' }}>Inscreva-se Agora</a>
            </div>
            <div className="presentation-image"></div>
          </div>
        </div>
      </section>

      {/* 3. INFORMAÇÕES - GRID ESCURO */}
      <section className="bg-grid">
        <div className="container">
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Agenda & Requisitos</h2>
            <p style={{ textAlign: 'left', maxWidth: '600px' }}>Prepare-se para o nosso próximo encontro. As datas específicas serão comunicadas aos inscritos.</p>
          </div>
          
          <div className="info-cards-grid">
            <InfoCard
              icon={Mic2}
              title="Vocal"
              items={[
                'Data a definir',
                'Teste prático e harmonia vocal'
              ]}
            />
            <InfoCard
              icon={Music}
              title="Instrumental"
              items={[
                'Data a definir',
                'Teste prático e dinâmica de banda'
              ]}
            />
            <InfoCard
              icon={CheckCircle}
              title="Integração"
              items={[
                'Mínimo de 6 meses de frequência ativa',
                'Ser batizado e viver vida cristã',
                'Compromisso com a visão da igreja'
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. PROCESSO */}
      <section className="bg-grid" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ textAlign: 'left' }}>A Jornada</h2>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* 5. FORMULÁRIO */}
      <section id="inscricao" className="bg-grid">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem', display: 'block' }}>Aplicação</span>
            <h2>Formulário de Inscrição</h2>
          </div>
          
          <FormWizard />
        </div>
      </section>
      
      {/* FOOTER BÁSICO */}
      <footer className="bg-grid" style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>© 2026 Tabernáculo Music. Todos os direitos reservados.</p>
      </footer>
    </>
  );
};
