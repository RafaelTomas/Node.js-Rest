const res = require('express/lib/response');
const moment = require('moment');
const conection = require('../infrastructure/conection');

class Atendimento {
    adiciona(atendimento,res){
        const sql = 'INSERT INTO atendimentoS SET  ?';
        
        const datacriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataValida = moment(data).isSameOrAfter(datacriacao);
        const clienteValido = atendimento.cliente.length >= 5;
        
        const validacoes= [
            {
                nome : 'data',
                valido : dataValida,
                mensagem : 'Data deve ser maior ou igual a data atual'
            
            },
            {
                nome : 'cliente',
                valido : clienteValido,
                mensagem : 'cliente deve ter mais de 5 caracteres'
            }
        ];
        
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        
        
        if(existemErros){
             
            res.status(400).json(erros);
        
        }else{ 
        
            const atendimentoDatado = {...atendimento, datacriacao, data};

        
            conection.query(sql, atendimentoDatado, (erro, resultado) => { 
        
        
            if(erro){
         
                res.status(400).json(erro);
         
            }else {
         
                res.status(201).json(resultado);
            }
        })
        }    
    }
}

module.exports  = new Atendimento;
