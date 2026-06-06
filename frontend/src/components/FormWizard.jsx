import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { StepPersonalData } from './StepPersonalData';
import { StepChristianLife } from './StepChristianLife';
import { StepMusicalProfile } from './StepMusicalProfile';
import { StepScheduling } from './StepScheduling';

export const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
  const totalSteps = 4;
  
  const handleNext = async () => {
    // Validate current step before proceeding
    let fieldsToValidate = [];
    if (currentStep === 1) fieldsToValidate = ['nome_completo', 'whatsapp', 'idade', 'estado_civil'];
    if (currentStep === 2) fieldsToValidate = ['tempo_igreja', 'batizado', 'veio_outra_igreja', 'fez_integracao'];
    if (currentStep === 3) fieldsToValidate = ['area_atuacao', 'instrumento_funcao', 'tempo_experiencia', 'ja_serviu_antes'];

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: document.getElementById('inscricao').offsetTop - 50, behavior: 'smooth' });
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: document.getElementById('inscricao').offsetTop - 50, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError('');
      const payload = {
        ...data,
        idade: Number(data.idade),
        batizado: data.batizado === 'sim',
        veio_outra_igreja: data.veio_outra_igreja === 'sim',
        fez_integracao: data.fez_integracao === 'sim',
        ja_serviu_antes: data.ja_serviu_antes === 'sim',
      };

      await api.post('/enviar.php', payload);
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Ocorreu um erro ao enviar a inscrição.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderStep = () => {
    switch(currentStep) {
      case 1: return <StepPersonalData register={register} errors={errors} setValue={setValue} />;
      case 2: return <StepChristianLife register={register} errors={errors} watch={watch} />;
      case 3: return <StepMusicalProfile register={register} errors={errors} watch={watch} />;
      case 4: return <StepScheduling register={register} errors={errors} />;
      default: return null;
    }
  };

  if (success) {
    return (
      <div className="success-card animate-enter">
        <CheckCircle size={80} className="success-icon" style={{ margin: '0 auto 2rem auto' }} />
        <h2 style={{ color: 'var(--text-primary)' }}>Inscrição Finalizada!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Seus dados foram enviados para nossa equipe. Aguarde nosso contato via WhatsApp.
        </p>
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          Fazer nova inscrição
        </button>
      </div>
    );
  }
  
  return (
    <div className="form-container">
      {serverError && (
        <div className="error-message" style={{ marginBottom: '2rem' }}>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <p>{serverError}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="progress-bar">
        {[1, 2, 3, 4].map(step => (
          <div 
            key={step} 
            className={`progress-step ${currentStep >= step ? 'active' : ''}`}
            title={`Etapa ${step}`}
          ></div>
        ))}
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 className="text-accent" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Etapa {currentStep} de {totalSteps}
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          {currentStep === 1 && "Informações básicas para contato."}
          {currentStep === 2 && "Seu histórico e contexto espiritual atual."}
          {currentStep === 3 && "Sua experiência e interesse musical."}
          {currentStep === 4 && "Confirmação e próximos passos."}
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="step-content" style={{ minHeight: '300px' }}>
          {renderStep()}
        </div>
        
        {/* Navigation Buttons */}
        <div className="form-navigation">
          <button 
            type="button"
            onClick={handlePrev} 
            disabled={currentStep === 1 || loading}
            className="btn-secondary"
            style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
          >
            <ChevronLeft size={20} /> Anterior
          </button>
          
          {currentStep < totalSteps ? (
            <button 
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              Próximo <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={20} className="animate-spin" /> Processando...</>
              ) : (
                <><CheckCircle size={20} /> Confirmar Inscrição</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
