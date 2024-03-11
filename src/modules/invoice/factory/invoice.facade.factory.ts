import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.use-case";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.use-case";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);

    return new InvoiceFacade(
      repository,
      generateInvoiceUseCase,
      findInvoiceUseCase
    );
  }
}