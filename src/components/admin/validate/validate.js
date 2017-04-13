const validate = values=>{
    const errors = {};
    if(!values.username)
    {
        errors.username = "姓名不能为空";
    }else if(values.username.length >15)
    {
        errors.username = "姓名不能大于15个字符";
    }
    if(!values.age)
    {
        errors.age = "年龄不能为空";
    }else if(isNaN(Number(values.age)))
    {
        errors.age = "一定要是数字";
    }else if(Number(values.age <18))
    {
        errors.age = "年龄看起来有点小啊";
    }
    if(!values.sex)
    {
        errors.sex = "对不起你是变性人!!!!!";
    }
    if(!values.hobby)
    {
        errors.hobby = "业余爱好是什么呢";
    }
    if(!values.specialty)
    {
        errors.specialty = "你的特长是什么呢?";
    }else if(values.specialty.length >100 && values.specialty.length <2)
    {
        errors.specialty = "你的特长不正确哦!!";
    }
    if(!values.occupation)
    {
        errors.occupation = "你的职业是什么呢?";
    }else if(values.occupation.length >30 && values.occupation.length<2)
    {
        errors.occupation = "你的职业不对哦!";
    }
    return errors;
};
export default validate;