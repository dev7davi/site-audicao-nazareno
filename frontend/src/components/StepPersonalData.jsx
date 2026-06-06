import React from 'react';
import { AlertCircle } from 'lucide-react';

const maskWhatsApp = (value) => {
  if (!value) return "";
  const v = value.replace(/\D/g, "");
  const m = v.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!m) return "";
  return !m[2] ? m[1] : `(${m[1]}) ${m[2]}` + (m[3] ? `-${m[3]}` : "");
};

export const StepPersonalData = ({ register, errors, setValue }) => {
  const handlePhoneChange = (e) => {
    setValue("whatsapp", maskWhatsApp(e.target.value), { shouldValidate: true });
  };

  return (
    <div className="form-grid animate-enter">
      <div className="form-group full-width">
        <label>Nome Completo</label>
        <input 
          {...register("nome_completo", { 
            required: "Nome é obrigatório",
            minLength: { value: 3, message: "Nome deve ter pelo menos 3 caracteres" }
          })}
          className="form-control"
          placeholder="Seu nome completo"
        />
        {errors.nome_completo && <span className="error-message"><AlertCircle size={14}/> {errors.nome_completo.message}</span>}
      </div>

      <div className="form-group">
        <label>WhatsApp</label>
        <input 
          {...register("whatsapp", { 
            required: "WhatsApp é obrigatório",
            minLength: { value: 14, message: "Insira um número válido" }
          })}
          onChange={handlePhoneChange}
          className="form-control"
          placeholder="(XX) XXXXX-XXXX"
          maxLength={15}
        />
        {errors.whatsapp && <span className="error-message"><AlertCircle size={14}/> {errors.whatsapp.message}</span>}
      </div>

      <div className="form-group">
        <label>Idade</label>
        <input 
          type="number"
          {...register("idade", { 
            required: "Idade é obrigatória",
            min: { value: 12, message: "Idade mínima de 12 anos" }
          })}
          className="form-control"
          placeholder="Sua idade"
        />
        {errors.idade && <span className="error-message"><AlertCircle size={14}/> {errors.idade.message}</span>}
      </div>

      <div className="form-group full-width">
        <label>Estado Civil</label>
        <select {...register("estado_civil", { required: "Selecione o estado civil" })} className="form-control">
          <option value="">Selecione...</option>
          <option value="solteiro">Solteiro(a)</option>
          <option value="casado">Casado(a)</option>
          <option value="separado">Separado(a)</option>
          <option value="amaziado">Amaziado(a)</option>
        </select>
        {errors.estado_civil && <span className="error-message"><AlertCircle size={14}/> {errors.estado_civil.message}</span>}
      </div>
    </div>
  );
};
