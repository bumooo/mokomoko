# GIT branch 생성하기


- develop 밑에 frontend 생성하기

```
git branch frontend develop

```


- frontend 밑에 내 브랜치 생성하기
```
git branch <사용자 이름> frontend
```

```
git branch blowfish fronted
```

- 생성된 branch 확인하기
```
git branch
```

- 현재 내 브랜치로 이동하기
```
git checkout frontend
git checkout blowfish
```



- 생성한 파일 commit 후 push 

```
git add .
git commit -m "DOCS : 브랜치 정리"

git push origin <사용자 이름>

//나는
git push origin blowfish
```


# git 명령어 
1. 브랜치를 develop로 변경 ($git checkout develop)
2. 수정된 사항을 develop에서 받아온다. ($git pull)
3. 변경사항 확인
4. 자신의 브랜치로 이동한다. ($git checkout <자기브랜치>)
5. 자신의 브랜치를 develop로 머지시킴 ($git merge develop)
6. 자신이 변경할 사항에 대해 커밋 ($git commit origin <자기브랜치>)
7. 자신의 브랜치 푸시 ($git push origin <자신의브랜치>)
8. develop 브랜치로 변경 ($git checkout develop)
9. 자신의 브랜치 병합 ($git merge <자신의브랜치>)
10. 푸시해주기 ($git push)



