import { CasePosition as CasePositionType, Position } from "./Types/Position";

export const CasePosition: CasePositionType[] = [
    {
        caseNumber: 1,
        x: 30,
        y: 20,
    },
    {
        caseNumber: 2,
        x: 128,
        y: 20,
    },
    {
        caseNumber: 3,
        x: 226,
        y: 20,
    },
    {
        caseNumber: 4,
        x: 324,
        y: 20,
    },
    {
        caseNumber: 5,
        x: 422,
        y: 20,
    },
    {
        caseNumber: 6,
        x: 422,
        y: 118,
    },
    {
        caseNumber: 7,
        x: 422,
        y: 216,
    },
    {
        caseNumber: 8,
        x: 422,
        y: 314,
    },
    {
        caseNumber: 9,
        x: 422,
        y: 412,
    },
    {
        caseNumber: 10,
        x: 324,
        y: 412,
    },
    {
        caseNumber: 11,
        x: 226,
        y: 412,
    },
    {
        caseNumber: 12,
        x: 128,
        y: 412,
    },
    {
        caseNumber: 13,
        x: 30,
        y: 412,
    },
    {
        caseNumber: 14,
        x: 30,
        y: 314,
    },
    {
        caseNumber: 15,
        x: 30,
        y: 216,
    },
    {
        caseNumber: 16,
        x: 30,
        y: 118,
    },
];

export function getLandingCase(current: number, amountToAdvance: number): number {

    let response = current + amountToAdvance;

    if (response > 16) {
        response -= 16;
    }

    return response;
}