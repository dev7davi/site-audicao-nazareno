import React from 'react';
import { AlertCircle } from 'lucide-react';

export const StepMusicalProfile = ({ register, errors, watch }) => {
  const areaAtuacao = watch("area_atuacao");

  return (
    <div className="form-grid animate-enter">
      <div className="form-group full-width">
        <label>Área da audição desejada</label>
        <select {...register("area_atuacao", { required: "Selecione a área" })} className="form-control">
          <option value="">Selecione...</option>
          <option value="Vocal">Vocal</option>
          <option value="Violão">Violão</option>
          <option value="Guitarra">Guitarra</option>
          <option value="Baixo">Baixo</option>
          <option value="Teclado">Teclado</option>
          <option value="Bateria">Bateria</option>
          <option value="Outros">Outros (especificar)</option>
        </select>
        {errors.area_atuacao && <span className="error-message"><AlertCircle size={14}/> {errors.area_atuacao.message}</span>}
      </div>

      {areaAtuacao === 'Outros' && (
        <div className="form-group full-width animate-enter">
          <label>Especifique sua área / instrumento</label>
          <input 
            {...register("instrumento_funcao", { required: "Por favor, especifique" })}
            className="form-control"
            placeholder="Ex: Saxofone, Percussão..."
          />
          {errors.instrumento_funcao && <span className="error-message"><AlertCircle size={14}/> {errors.instrumento_funcao.message}</span>}
        </div>
      )}

      <div className="form-group">
        <label>Tempo de Experiência</label>
        <select {...register("tempo_experiencia", { required: "Selecione" })} className="form-control">
          <option value="">Selecione...</option>
          <option value="Iniciante">Iniciante</option>
          <option value="1-3 anos">1 a 3 anos</option>
          <option value="3-5 anos">3 a 5 anos</option>
          <option value="Mais de 5 anos">Mais de 5 anos</option>
        </select>
        {errors.tempo_experiencia && <span className="error-message"><AlertCircle size={14}/> {errors.tempo_experiencia.message}</span>}
      </div>

      <div className="form-group">
        <label>Já serviu na música antes?</label>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" value="sim" {...register("ja_serviu_antes", { required: "Obrigatório" })} /> Sim
          </label>
          <label className="radio-label">
            <input type="radio" value="nao" {...register("ja_serviu_antes", { required: "Obrigatório" })} /> Não
          </label>
        </div>
        {errors.ja_serviu_antes && <span className="error-message"><AlertCircle size={14}/> {errors.ja_serviu_antes.message}</span>}
      </div>
    </div>
  );
};
