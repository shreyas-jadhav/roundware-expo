export interface Asset {
    id: number,
    description: string,
    latitude: number,
    longitude: number,
    
    filename: string,
    file: null,
    volume: number,
    submitted: true,
    created: string,
    weight: number,
    project: number,
    language_id: number,
    description_loc_ids: [],
    alt_text_loc_ids: [],
    media_type: string,
    audio_length_in_seconds: number,
    tag_ids: [8,3,5],
    session_id: number,
    envelope_ids: [1]
}