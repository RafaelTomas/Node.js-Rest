const res = require('express/lib/response');
const moment = require('moment');
const conection = require('../infrastructure/conection');

class Atendimento {
    adiciona(atendimento,res){
        
        const datacriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataValida = moment(data).isSameOrAfter(datacriacao);
        const clienteValido = atendimento.cliente.length > 5;
        
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

            const sql = 'INSERT INTO atendimentoS SET  ?';

            conection.query(sql, atendimentoDatado, (erro, resultado) => { 
        
        
            if(erro){
         
                res.status(400).json(erro);
         
            }else {
         
                res.status(201).json(resultado);
            }
        })
        }    
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos';

        conection.query(sql, (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        })
    }

    buscaPorId(id, res) {
        
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

        conection.query(sql, (erro, resultado) => {
           
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultado);
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?';

        conection.query(sql, [valores, id], (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores,id});
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        conection.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id})    
            }
        });
    }
}


module.exports  = new Atendimento;
