import letsEncryptController from '../controllers/LetsEncryptController';

export default (app: any) => {
  app.get('/.well-known/acme-challenge/:id', letsEncryptController.get);
};
