type Headline = {
    owned: number;
    total: number;
    percentComplete: number;
}

 export type ClosestToComplete = {
 setId: string;
 name: string;
 total: number;
 logoUrl: string | null;
 owned: number;
 percentComplete: number;
 }

 type RarityVariantBreakdown = {
 rarity: string;
 variant: string;
 count: number;
 }

 type Recent = {
 obtainedAt: string;
 variant: string;
 rarity: string;
 imageSmall: string | null;
 imageLarge: string | null;
 }

export type Dashboard = {
    headline: Headline;
    closestToComplete: ClosestToComplete[];
    rarityVariantBreakdown: RarityVariantBreakdown[];
    recent: Recent[];
}