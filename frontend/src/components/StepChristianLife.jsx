import React from 'react';
import { AlertCircle } from 'lucide-react';

export const StepChristianLife = ({ register, errors, watch }) => {
  const veioOutraIgreja = watch("veio_outra_igreja");

  return (
    <div className="form-grid animate-enter">
      <div className="form-group full-width">
        <label>Quanto tempo em nossa igreja</label>
        <select {...register("tempo_igreja", { required: "Selecione o tempo" })} className="form-control">
          <option value="">Selecione...</option>
          <option value="Menos de 1 ano">Menos de 1 ano</option>
          <option value="1-3 anos">1 a 3 anos</option>
          <option value="3-5 anos">3 a 5 anos</option>
          <option value="Mais de 5 anos">Mais de 5 anos</option>
        </select>
        {errors.tempo_igreja && <span className="error-message"><AlertCircle size={14}/> {errors.tempo_igreja.message}</span>}
      </div>

      <div className="form-group">
        <label>É Batizado nas águas?</label>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" value="sim" {...register("batizado", { required: "Obrigatório" })} /> Sim
          </label>
          <label className="radio-label">
            <input type="radio" value="nao" {...register("batizado", { required: "Obrigatório" })} /> Não
          </label>
        </div>
        {errors.batizado && <span className="error-message"><AlertCircle size={14}/> {errors.batizado.message}</span>}
      </div>

      <div className="form-group">
        <label>Veio de outra igreja?</label>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" value="sim" {...register("veio_outra_igreja", { required: "Obrigatório" })} /> Sim
          </label>
          <label className="radio-label">
            <input type="radio" value="nao" {...register("veio_outra_igreja", { required: "Obrigatório" })} /> Não
          </label>
        </div>
        {errors.veio_outra_igreja && <span className="error-message"><AlertCircle size={14}/> {errors.veio_outra_igreja.message}</span>}
      </div>

      {veioOutraIgreja === 'sim' && (
        <div className="form-group full-width animate-enter">
          <label>Já fez o curso de integração?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" value="sim" {...register("fez_integracao", { required: "Obrigatório para quem veio de outra igreja" })} /> Sim
            </label>
            <label className="radio-label">
              <input type="radio" value="nao" {...register("fez_integracao", { required: "Obrigatório para quem veio de outra igreja" })} /> Não
            </label>
          </div>
          {errors.fez_integracao && <span className="error-message"><AlertCircle size={14}/> {errors.fez_integracao.message}</span>}
        </div>
      )}
    </div>
  );
};
