import { Expenditure } from "../Domain/User/Expenditure";
import { ExpenditureDTO } from "../DTO/ExpenditureDTO";
import ExpenditureModel, { IExpenditureModel } from "../Model/ExpenditureModel";

/**
 * Mapper for Expenditure
 */
export class ExpenditureMapper {

  /**
   * Method to map from json to a ExpenditureDTO
   * @param body Json body
   * @returns ExpenditureDTO
   */
  static json2Dto(body: any): ExpenditureDTO {
    return new ExpenditureDTO(body.id, body.value, body.justification, body.date, body.transactionId);
  }

  /**
   * Method to map from DTO to a Domain
   * @param expenditureDTO ExpenditureDTO
   * @returns Expenditure Domain Model
   */
  static dto2Domain(expenditureDTO: ExpenditureDTO): Expenditure {
    let expenditure = new Expenditure(
      expenditureDTO.id,
      expenditureDTO.value,
      expenditureDTO.justification,
      new Date(expenditureDTO.date),
      expenditureDTO.transactionId
    );
    return expenditure;
  }

  /**
   * Method to map from Domain to a DB Model
   * @param expenditure Expenditure Domain object
   * @returns Expenditure DB Model
   */
  static domain2Model(expenditure: Expenditure): IExpenditureModel {
    let expenditureModel = new ExpenditureModel({
      id: expenditure.getID(),
      value: expenditure.getValue(),
      justification: expenditure.getJustification(),
      date: expenditure.getDate().toString(),
      transactionId: expenditure.getTransactionId(),
    });
    return expenditureModel;
  }

  /**
   * Method to map from DB Model to Domain
   * @param expenditureModel Expenditure DB Model
   * @returns Expenditure Domain object
   */
  static model2Domain(expenditureModel: IExpenditureModel): Expenditure {
    let expenditure = new Expenditure(
      expenditureModel._id.valueOf(),
      expenditureModel.value,
      expenditureModel.justification,
      new Date(expenditureModel.date),
      expenditureModel.transactionId
    );
    return expenditure;
  }

  /**
   * Method to map from Domain to a DonationDTO
   * @param expenditure Expenditure Domain object
   * @returns ExpenditureDTO
   */
  static domain2Dto(expenditure: Expenditure): ExpenditureDTO {
    let expenditureDTO = new ExpenditureDTO(
      expenditure.getID(),
      expenditure.getValue(),
      expenditure.getJustification(),
      expenditure.getDate().toString(),
      expenditure.getTransactionId()
    );
    return expenditureDTO;
  }
}
