const customExpress = require('./config/customExpress');
const conection = require('./infrastructure/conection');
const app = customExpress();

conection.connect(error =>{
    if(error){
        console.log(error);
    } else {
        console.log('conectado com sucesso!');
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
      
    }
});



