import { CasePosition as CasePositionType, Position } from "./Types/Position";

export const CasePosition: CasePositionType[] = [
    {
        caseNumber: 1,
        x: 75,
        y: 95,
    },
    {
        caseNumber: 2,
        x: 173,
        y: 95,
    },
    {
        caseNumber: 3,
        x: 271,
        y: 95,
    },
    {
        caseNumber: 4,
        x: 369,
        y: 95,
    },
    {
        caseNumber: 5,
        x: 467,
        y: 95,
    },
    {
        caseNumber: 6,
        x: 467,
        y: 193,
    },
    {
        caseNumber: 7,
        x: 467,
        y: 291,
    },
    {
        caseNumber: 8,
        x: 467,
        y: 389,
    },
    {
        caseNumber: 9,
        x: 467,
        y: 487,
    },
    {
        caseNumber: 10,
        x: 369,
        y: 487,
    },
    {
        caseNumber: 11,
        x: 271,
        y: 487,
    },
    {
        caseNumber: 12,
        x: 173,
        y: 487,
    },
    {
        caseNumber: 13,
        x: 75,
        y: 487,
    },
    {
        caseNumber: 14,
        x: 75,
        y: 389,
    },
    {
        caseNumber: 15,
        x: 75,
        y: 291,
    },
    {
        caseNumber: 16,
        x: 75,
        y: 193,
    },
];

export default function getLandingCase(current: number, amountToAdvance: number): number {

    let response = current + amountToAdvance;

    if (response > 16) {
        response -= 16;
    }

    return response - 1;
}