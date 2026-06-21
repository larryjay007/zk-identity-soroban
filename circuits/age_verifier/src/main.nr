fn main(
    birth_year: u32,
    current_year: pub u32
) {
    let age = current_year - birth_year;

    assert(age >= 18);
}
