const customExpress = require('./config/customExpress');
const conection = require('./infrastructure/conection');
const table = require('./infrastructure/table')

conection.connect(erro =>{
    if(erro){
        console.log(erro);
    } else {
        console.log('conectado com sucesso!');
        
        table.init(conection)
        const app = customExpress();
        
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
      
    }
});



