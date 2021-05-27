export class ParametrosAtendimentoPaciente {

    id: number;
    quantidadeParcelas: number;
    tempoMesesGeracaoAutomaticaHorariosAtendimento: number;
    intervaloMinutosEntreAtendimentos: number;
    intervaloDiasEntrePrimeiraConsultaRetorno: number;
    intervaloDiasEntreConsultaRetorno: number;
    intervaloDiasEntreRetornoConsulta: number;
    precoConsulta: string;

    tempoMesesAtualizarQuestionarioFrequenciaAlimentar: number;
	tempoMesesAtualizarHistoricoSocial: number;
	tempoMesesAtualizarHistoricoPatologiaFamiliares: number;
	tempoMesesAtualizarHistoricoAtividadeFisica: number;
	tempoMesesAtualizarHistoricoAlimentar: number;
	tempoMesesAtualizarHistoricoFrequenciaAlimentar: number;
}