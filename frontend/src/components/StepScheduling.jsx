import React from 'react';
import { AlertCircle, Calendar } from 'lucide-react';

export const StepScheduling = ({ register, errors }) => {
  return (
    <div className="form-grid animate-enter">
      <div className="form-group full-width">
        <div className="scheduling-card">
          <Calendar size={64} color="var(--accent-primary)" />
          
          <div>
            <h4>Definição de Agenda</h4>
            <p>
              Como as datas e horários exatos das próximas audições ainda estão sendo definidos pela liderança, 
              você será notificado via WhatsApp assim que abrirmos a agenda.
            </p>
          </div>

          <label className="radio-label">
            <input 
              type="checkbox" 
              {...register("ciente_datas", { required: "Você precisa confirmar que está ciente." })} 
            />
            <span>ESTOU CIENTE E AGUARDAREI O CONTATO.</span>
          </label>
          
          {errors.ciente_datas && (
            <span className="error-message">
              <AlertCircle size={16}/> {errors.ciente_datas.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
